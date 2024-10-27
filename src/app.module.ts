import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [PropertyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
