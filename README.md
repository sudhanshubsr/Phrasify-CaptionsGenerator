<div align="center">
  <h1 align="center">Phrasifyk</h1>
  <h3>Best Way to add Captions to your Videos</h3>

</div>

<div align="center">
  <a href="https://phrasify.sudhanshu.site">Phrasify.com</a>
</div>

<br/>
<br/>

# Phrasify: AWS Transcribe-powered Caption Generator

Phrasify is a caption generator that harnesses the accuracy of AWS Transcribe for audio transcription. Seamlessly integrated with `ffmpeg`, it provides a streamlined solution for both audio and video captioning. 
With Phrasify, users can effortlessly transcribe audio content and generate accurate and customizable captions. The platform excels in providing a user-friendly interface, ensuring ease of use for content creators, marketers, and individuals seeking to improve accessibility and engagement.


## Features
- **Accurate Transcription:** Utilize AWS Transcribe for precise audio-to-text conversion.
- **Versatile Captioning:** Seamlessly integrate captions into both audio and video content.
- **User-Friendly Interface:** An intuitive platform for content creators, ensuring easy transcription and caption customization.
- **Enhanced Accessibility:** Improve content accessibility and engagement with customized captions.


## Demo 
![Papermark Welcome GIF](.github/images/papermark-welcome.gif)


## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – language
- [Tailwind](https://tailwindcss.com/) – styling
- [Prisma](https://prisma.io) - orm
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Vercel](https://vercel.com/) – hosting
- [Amazon S3](https://aws.amazon.com/s3) – storage
- [AWS Transcribe](https://aws.amazon.com/transcribe) – transcription



## Getting Started


### 1. Clone the repository

```shell
git clone https://github.com/mfts/CaptionsGenerator.git
cd CaptionsGenerator
```

### 2. Install npm dependencies

```shell
yarn install
```

### 3. Copy the environment variables to `.env`

```shell
cp .env.example .env
```

### 4. Configure the variables in `.env`

| Variable | Value |
|---|---|
| NEXTAUTH_SECRET | a random string |
| NEXTAUTH_URL | < Your base domain or localhost:3000 > |
| GOOGLE_CLIENT_ID | < Google Client ID > |
| GOOGLE_CLIENT_SECRET | < Google Client Secret > |
| NEXT_PUBLIC_BASE_URL | < Your base domain or localhost:3000 > |
| AWS_ACCESS_KEY_ID | < aws access key ID> |
| AWS_SECRET_ACCESS_KEY | < aws secret access key for s3> |
| AWS_BUCKET_NAME | < bucket name > |
| AWS_REGION | < Aws region > |
| GITHUB_CLIENT_ID | < Github Client ID >
| GITHUB_CLIENT_SECRET | < Github Client Secret > |



### 6. Run the dev server

```shell
yarn run dev
```

### 7. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.


To prepare the Tinybird database, follow these steps:

0. We use `pipenv` to manage my Python dependencies. If you don't have it installed, you can install it using the following command:
    ```sh
    pkgx pipenv
    ```
1. Download the Tinybird CLI from [here](https://www.tinybird.co/docs/cli.html) and install it on your system.
2. After authenticating with the Tinybird CLI, navigate to the `lib/tinybird` directory:
    ```sh
    cd lib/tinybird
    ```
3. Push the necessary datasources using the following command:
    ```sh
    tb push datasources/*
    tb push endpoints/get_*
    ```
4. Don't forget to set the `TINYBIRD_TOKEN` with the appropriate rights in your `.env` file.


#### Updating Tinybird

```sh
pipenv shell
## start: pkgx-specific
cd ..
cd papermark
## end: pkgx-specific
pipenv update tinybird-cli
```

## Deploy your own

All you need is a Vercel account and access to Vercel Storage (_Blob_ and _Postgres_). Click the
button below to clone and deploy:

[![Deploy with Vercel](https://vercel.com/button)]

## Contributing

Papermark is an open-source project and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.


## Inspiration

...and friends
- [Kapwing](https://www.kapwing.com/subtitles) - Subtitles Generator


