# POLINET
## P2P Open Liquidity Network for 0x-based protocols

## Disclamer
This project is in PoC stage right now, it is not ready for production usage.

## Demo video
[Link to the video](https://drive.google.com/file/d/18Gs_z9fOCSJvsNsog7U5bHXsFMyHmEhb/view?usp=sharing)

## Inspiration
We believe in open protocols and decentralized applications and, therefore, prior to POLINET, we built Bloqboard, a platform that facilitates borrowing and lending of tokens built on the Dharma, a p2p lending protocol. We decided to go one step further and created a decentralized p2p network that facilitates trading and lending on 0x-based protocols without intermediaries like relayers.     

## What is it?
P2P Open Liquidity Network for 0x-based protocols (like 0x, dharma, dYdX, etc.) that provides a decentralized channel to share orders and trade or lend tokens between network peers.
For now, we have two implementations of POLINET clients: DApp (react.js) and Node.js

## How we built it
We built it as a decentralized web application using _IPFS pubsub_ and _WebRTC_ for p2p communication and _dharma.js_/_0x.js_ for orders validation.

## Challenges we ran into and what we learned
A browser version _libp2p pubsub_ is not so mature, so we decided to use a more mature _IPFS pubsub_ library.

## What's next for Bloqboard PoliNet
We will continue developing POLINET to integrate it with the token lending and trading protocols.

## Development
### Web version
Run it locally:
```
yarn && yarn start
```

Publish it to IPFS:
```
ipfs daemon
yarn build
npm install ipscend --global
ipscend publish
```

### Node.js version
Run it locally:
```
NODE_ENV=production node start.js
```

### Contacts:
Alex Bazhanau
- telegram: @frostiq
- email: alex@confirmationlabs.io
