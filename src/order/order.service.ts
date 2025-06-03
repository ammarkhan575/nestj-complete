import { Injectable, Res } from "@nestjs/common";
import { Subject } from "rxjs";

@Injectable()
export class OrderService {
    private orders = new Map<string, string>();
    private streams = new Map<string, Subject<string>>();

    createOrder(name: string): string {
        const id = Math.random().toString(36).substring(7);
        this.orders.set(id, 'Pending');

        const subject = new Subject<string>();
        this.streams.set(id, subject);

        this.simulateStatusUpdates(id);
        return id;
    }

    getOrderStream(id: string) {
        const stream = this.streams.get(id);
        if (!stream) {
            throw new Error(`Stream not found for order ID: ${id}`);
        }
        return stream.asObservable();
    }

    private simulateStatusUpdates(id: string) {
        const steps = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
        let i = 0;

        const interval = setInterval(() => {
            if (i >= steps.length) return clearInterval(interval);
            this.orders.set(id, steps[i]);
            this.streams.get(id)?.next(steps[i]);
            i++;
        }, 6000);
    }
}