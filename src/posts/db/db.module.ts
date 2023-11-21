import { Module } from '@nestjs/common';
import { DBService } from './db.service';


// @Module({
//   providers: [initDB],
//   exports: ['INIT'],
// })

@Module({
  providers: [DBService],
  exports: [DBService],
})
export class DBModule { }
