import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsUrl()
  @IsNotEmpty()
  coverUrl: string;
}
