import _ from 'lodash';
import axios from 'axios';
import Twitter from 'twitter';

/**
 * Twitter uses 3 legged oAuth for certain endpoints. 
 * You can get the oauth key and secret by simulating the API calls yourselves.
 * You need a approved developer account.
 */
export default class TwitterHelper {
  config: any;
  client: any;
  constructor(config:any) {
    this.config = config;
    this.client = new Twitter({
      consumer_key: this.config.twitter.consumerApiKey,
      consumer_secret: this.config.twitter.consumerApiSecret,
      access_token_key: this.config.twitter.oauth.token,
      access_token_secret: this.config.twitter.oauth.secret
    });
  }

  /**
   * Downloads image from a URL and returns it in Base64 format.
   * @param url 
   * @returns 
   */
  getBase64(url:string) {
    return axios.get(url, {
      responseType: 'arraybuffer'
    }).then(response => Buffer.from(response.data, 'binary').toString('base64'))
  }

  /**
   * Format your tweet, you can use emojis.
   * @param saleInfo 
   * @returns 
   */
  formatTweet(saleInfo:any) {
    return {
      status: `this is a test ${Math.round(Date.now() / 1000)}`
    };
  }

  /**
   * Creates a formatted tweet, uploads the NFT image to twitter and then posts a status update.
   * @param saleInfo 
   */
  async send(saleInfo:any) {
    const me = this;
    let tweetInfo = me.formatTweet(saleInfo);
    /*let image = await me.getBase64(`${saleInfo.nftInfo.image}`);
    let mediaUpload;
    try {
      mediaUpload = await me.client.post('media/upload', { media_data: image });
    } catch (err) {
      console.log(JSON.stringify(err));
      throw err;
    }*/
    //await me.client.post('statuses/update.json', { status: tweetInfo.status, media_ids: mediaUpload.media_id_string });
    try{
      await me.client.post('statuses/update.json', { status: tweetInfo.status});
    }
    catch(err){
      console.log(JSON.stringify(err));
      throw err;
    }
  }
}
