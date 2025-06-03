import { Body, Controller, Param, Post, Sse } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { map, Observable } from 'rxjs';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post()
    create(@Body() body: CreateOrderDto) {
        const orderId = this.orderService.createOrder(body.name);
        return { orderId };
    }

    @Sse(':id/stream')
    streamOrder(@Param('id') id: string): Observable<MessageEvent> {
        return this.orderService.getOrderStream(id).pipe(
            map(status => ({ data: { status } } as MessageEvent))
        );
    }
}
