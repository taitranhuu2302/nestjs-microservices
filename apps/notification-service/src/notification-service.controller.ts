import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  constructor(private readonly appService: NotificationServiceService) {}

  @EventPattern('user_created')
  handleUserCreated(@Payload() data: any) {
    this.appService.sendUserCreatedNotification(data);
  }

  @EventPattern('product_created')
  handleProductCreated(@Payload() data: any) {
    this.appService.sendProductCreatedNotification(data);
  }
}
