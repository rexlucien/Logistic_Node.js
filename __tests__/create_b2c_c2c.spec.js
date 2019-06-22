const moment = require('moment');
const ecpay_logistics = require('../ecpay_logistics_nodejs/lib/ecpay_logistics');

const c2c_config = {
  Conf: {
    OperatingMode: 'Test',
    MercProfile: 'Stage_Account_Logistics_C2C',
    IsProjectContractor: 'N',
    MerchantInfo: {
      Production_Account: {
        MerchantID: '',
        HashKey: '',
        HashIV: '',
      },
      Stage_Account_Logistics_B2C: {
        MerchantID: '2000132',
        HashKey: '5294y06JbISpM5x9',
        HashIV: 'v77hoKGq4kWxNNIS',
      },
      Stage_Account_Logistics_C2C: {
        MerchantID: '2000933',
        HashKey: 'XBERn1YOvpM9nfZc',
        HashIV: 'h1ONHk4P4yqbl5LK',
      },
    },
    IgnorePayment: [],
  },
};

// TODO fix async test
describe('create_b2c_c2c', () => {
  test('should create a C2C delivery successfully', async () => {
    const params = c2c_config;
    const form = generateForm();

    let service = new ecpay_logistics(params);
    await service.create_client
      .create(form)
      .then(res => {
        console.log(res);
        expect(res).not.toBeNull();
      })
      .catch(err => {
        expect(err).toBeNull();
      });
  }, 10000);
});

function generateForm() {
  // 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值

  const form = {
    MerchantTradeNo: `${Date.now()}`, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93, 為aiocheckout時所產生的
    MerchantTradeDate: `${moment().format('YYYY/MM/DD HH:mm:ss')}`, // 請帶交易時間, ex: 2017/05/17 16:23:45, 為aiocheckout時所產生的
    LogisticsType: 'CVS',
    LogisticsSubType: 'UNIMARTC2C', //UNIMART、FAMI、HILIFE、UNIMARTC2C、FAMIC2C、HILIFEC2C
    GoodsAmount: '200',
    CollectionAmount: '200',
    IsCollection: '',
    GoodsName: 'test',
    SenderName: '綠界科技',
    SenderPhone: '29788833',
    SenderCellPhone: '0912345678',
    ReceiverName: '綠界科技',
    ReceiverPhone: '0229768888',
    ReceiverCellPhone: '0912345678',
    ReceiverEmail: 'tesy@gmail.com',
    TradeDesc: '',
    ServerReplyURL: 'http://192.168.0.1/ReceiverServerReply', // 物流狀況會通知到此URL
    LogisticsC2CReplyURL: 'http://192.168.0.1/ReceiverServerReply',
    ClientReplyURL: '',
    Remark: '',
    PlatformID: '',
    ReceiverStoreID: '991182', // 請帶收件人門市代號(統一):991182  測試商店代號(全家):001779 測試商店代號(萊爾富):2001、F227
    ReturnStoreID: '',
  };

  return form;
}
