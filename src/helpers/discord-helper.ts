import _ from 'lodash';
import axios from 'axios';

/**
 * Just setup a new channel in discord, then go to settings, integrations and created a new webhook
 * Set the webhook URL in the config.json.
 */
export default class DiscordHelper {
  config: any;
  constructor(config:any){
    this.config = config;
  }

  _createWebhookData(saleInfo:any) {
    return {
      "username": "Lifinity Flares Sales Bot",
      "embeds": [
        {
          "author": {
            "name": "Lifinity Flares Sales Bot"
          },
          "fields": [
            {
              "name": "Price",
              "value": saleInfo.saleAmount
            },
            {
              "name": "Seller",
              "value": saleInfo.seller,
              "inline": true
            },
            {
              "name": "Buyer",
              "value": saleInfo.buyer,
              "inline": true
            },
            {
              "name": "Transaction ID",
              "value": saleInfo.txSignature,
              "inline": false
            },
            {
              "name": "Marketplace",
              "value": saleInfo.marketPlace,
              "inline": false
            }
          ],
          "color": 14303591,
          "title": `${saleInfo.nftInfo.id} → SOLD (test)`,
          "url": `https://explorer.solana.com/tx/${saleInfo.txSignature}`,
          "thumbnail": {
            "url": `https://nft.lifinity.io/api/download/${(saleInfo.nftInfo.id).replace('#','')}`
          },
          "timestamp": new Date(saleInfo.time * 1000).toISOString()
        }
      ]
    }
  }
  
  async send(saleInfo:any) {
    const me = this;
    await axios.post(this.config.discord.webhookUrl, me._createWebhookData(saleInfo));
  }
}
