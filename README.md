# seal-generator
前端印章样式生成

## 安装
`npm i S seal-generator`

## 使用
```
import { SealGenerator } from 'seal-generator';

... // 省略

const sg = new SealGenerator();
img.src = sg.getBase64Data('上海xxx有限公司', '测试人员');
```