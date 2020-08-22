const  _LEDFLASH2_MODE_OFF = 0x00;
const  _LEDFLASH2_MODE_FLASH = 0x01;
const  _LEDFLASH2_MODE_TORCH = 0x02;


const  _LEDFLASH2_CUR_100 = 0x00;
const  _LEDFLASH2_CUR_90 = 0x01;
const  _LEDFLASH2_CUR_80 = 0x02;
const  _LEDFLASH2_CUR_70 = 0x03;
const  _LEDFLASH2_CUR_63 = 0x04;
const  _LEDFLASH2_CUR_56 = 0x05;
const  _LEDFLASH2_CUR_50 = 0x06;
const  _LEDFLASH2_CUR_44 = 0x07;
const  _LEDFLASH2_CUR_39 = 0x08;
const  _LEDFLASH2_CUR_35 = 0x09;
const  _LEDFLASH2_CUR_31 = 0x0A;
const  _LEDFLASH2_CUR_28 = 0x0B;
const  _LEDFLASH2_CUR_25 = 0x0C;
const  _LEDFLASH2_CUR_22 = 0x0D;
const  _LEDFLASH2_CUR_20 = 0x0E;
const  _LEDFLASH2_CUR_18 = 0x0F;

const  _LEDFLASH2_FTMR_1250 = 0xE0;
const  _LEDFLASH2_FTMR_1093 = 0xC0;
const  _LEDFLASH2_FTMR_937 = 0xA0;
const  _LEDFLASH2_FTMR_781 = 0x80;
const  _LEDFLASH2_FTMR_625 = 0x60;
const  _LEDFLASH2_FTMR_468 = 0x40;
const  _LEDFLASH2_FTMR_312 = 0x20;
const  _LEDFLASH2_FTMR_156 = 0x00;


function ledflash2_i2cDriverInit(gpioObj : number, i2cObj: number, slave:number)
{
    let _slaveAddress = slave;
    hal_i2cMap( (T_HAL_P)i2cObj );
    hal_gpioMap( (T_HAL_P)gpioObj );

    ledflash2_setMode(_LEDFLASH2_MODE_OFF, 0, 0);
}