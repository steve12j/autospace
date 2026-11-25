import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module.js'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Autospace | Steve Jose')
    .setDescription(
      `The Autospace API.
      <h2>Looking  for the graphql api?<h2>
      Go to <a href="/graphql" target="_blank">/graphql</a>.
      Or,
      You might also need to use <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer/">Apollo Explorer</a>
      for a better experience.
      `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000)
}
await bootstrap()
