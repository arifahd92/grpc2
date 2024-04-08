import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroesController } from './hero.controller';
// import { HeroController } from './hero.controller';

@Module({
  controllers: [HeroesController],
  providers: [HeroService],
})
export class HeroModule {}
