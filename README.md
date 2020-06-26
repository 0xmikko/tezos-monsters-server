# Tezos Monsters
## Horror adventure game to learn Ligo language & Tezos blockchain 

![Screenshot 2020-06-26 at 02 11 42](https://user-images.githubusercontent.com/26343374/85804722-0149be00-b753-11ea-9486-9923e3e442f3.png)

This project was designed from scratch especially for CoinList Tezos hackahton.

Demo: https://tezos-monsters.com

## Project repositories

Server: https://github.com/MikaelLazarev/tezos-monsters-server  
Front-end: https://github.com/MikaelLazarev/tezos-monsters-client  
Editor: https://github.com/MikaelLazarev/tezos-monsters-editor  
Code checker service: https://github.com/MikaelLazarev/tezos-monsters-ligo-server  
Monster factory service: https://github.com/MikaelLazarev/tezos-monsters-factory  

## Problem

Tezos provides unique blockchain features for developers, however, there is a big barrier to start to use it, you have to learn a new programming language. For many blockchain 
developers it's a barrier.

## Inspiration

I've learnt and loved solidity playing with CryptoZombies. It's amazing game and very valuable resourse for developers. 

## Solution
In Tezos-Monsters I've combined story with solving programming tasks. All tasks are design to provide learning in convinient way.

## How to install server

### Prerequisites

To install this package you should have:

- NodeJS and package manager
- Postgres DB
- Google Cloud Platform account
- Sentry account

#### Installation

1. Clone this repository ```git clone git@github.com:MikaelLazarev/tezos-monsters-server.git```
2. Go to buzzchat folder: ```cd tezos-monsters-server```
3. Install node modules: ```yarn or npm i```
4. Create a configuration file mv ./.env.sample .env
5. Open config file and fill with properties:
```
DATABASE_URL=
JWT_SECRET=
GOOGLE_CP=
GCP_PICUTRES_BUCKET=
CODE_CHECKER_URL=
CODE_CHECKER_TOKEN=
```
6. Save account
7. Start server with ```yarn dev``` or ```npm run dev```

## Disclaimer

This application is provided "as is" and "with all faults." Me as developer makes no representations or warranties of any kind concerning the safety, suitability, lack of viruses, inaccuracies, typographical errors, or other harmful components of this software. There are inherent dangers in the use of any software, and you are solely responsible for determining whether this software product is compatible with your equipment and other software installed on your equipment. You are also solely responsible for the protection of your equipment and backup of your data, and THE PROVIDER will not be liable for any damages you may suffer in connection with using, modifying, or distributing this software product.
