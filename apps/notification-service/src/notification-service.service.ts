import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationServiceService {
  private readonly logger = new Logger(NotificationServiceService.name);

  sendUserCreatedNotification(user: any) {
    this.logger.log(`User created: ${JSON.stringify(user)}`);
  }

  sendProductCreatedNotification(product: any) {
    this.logger.log(`Product created: ${JSON.stringify(product)}`);
  }
}
