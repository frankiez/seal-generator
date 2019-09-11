"use strict";
/*
 * @Author: 朱晨旭
 * @Date: 2019-09-11 14:46:54
 * @Last Modified by: 朱晨旭
 * @Last Modified time: 2019-09-11 17:08:38
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SealGenerator = /** @class */ (function () {
    function SealGenerator() {
        this.canvas = null;
        this.ctx = null;
        this.width = 166;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resetCanvas();
    }
    // 重置canvas大小，同时清空画布
    SealGenerator.prototype.resetCanvas = function () {
        this.canvas.width = this.width;
        this.canvas.height = this.width;
        this.canvas.style.transform = 'scale(.7)';
    };
    // 绘制五角星
    SealGenerator.prototype.create5star = function (sx, sy, radius, color, rotato) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.translate(sx, sy); // 移动坐标原点
        this.ctx.rotate(Math.PI + rotato); // 旋转
        this.ctx.beginPath(); // 创建路径
        var dig = Math.PI / 5 * 4;
        for (var i = 0; i < 5; i++) {
            // 画五角星的五条边
            var x = Math.sin(i * dig);
            var y = Math.cos(i * dig);
            this.ctx.lineTo(x * radius, y * radius);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    };
    // 生成印章
    SealGenerator.prototype.createSeal = function (company, name) {
        this.resetCanvas();
        // 绘制印章边框
        var width = this.canvas.width / 2;
        var height = this.canvas.height / 2;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#f00';
        this.ctx.beginPath();
        this.ctx.arc(width, height, 78, 0, Math.PI * 2);
        this.ctx.stroke();
        // 画五角星
        this.create5star(width, height, 28, '#f00', 0);
        // 绘制印章名称
        this.ctx.font = '16px STSong,SimSun';
        if (name.length > 6) {
            this.ctx.font = '12px STSong,SimSun';
        }
        this.ctx.textBaseline = 'middle'; // 设置文本的垂直对齐方式
        this.ctx.textAlign = 'center'; // 设置文本的水平对对齐方式
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = '#f00';
        this.ctx.fillText(name, width, height + 55);
        // 绘制印章单位
        var count = company.length; // 字数
        this.ctx.translate(width, height); // 平移到此位置,
        this.ctx.font = '20px STSong,SimSun';
        if (count > 12) {
            this.ctx.font = '16px STSong,SimSun';
        }
        if (count > 17) {
            this.ctx.font = '14px STSong,SimSun';
        }
        if (count > 20) {
            this.ctx.font = '12px STSong,SimSun';
        }
        var angle = 4 * Math.PI / (3 * (count - 1)); // 字间角度
        var chars = company.split('');
        for (var i = 0; i < count; i++) {
            var c = chars[i]; // 需要绘制的字符
            if (i === 0) {
                this.ctx.rotate(5 * Math.PI / 6);
            }
            else {
                this.ctx.rotate(angle);
            }
            this.ctx.save();
            this.ctx.translate(90, 0); // 平移到此位置,此时字和x轴垂直
            this.ctx.rotate(Math.PI / 2); // 旋转90度, 让字平行于x轴
            this.ctx.fillText(c, 0, 27); // 此点为字的中心点
            this.ctx.restore();
        }
    };
    // 返回印章图base64数据
    SealGenerator.prototype.getBase64Data = function (company, name, width) {
        if (width === void 0) { width = 166; }
        this.width = width;
        this.createSeal(company, name);
        return this.canvas.toDataURL('image/png');
    };
    return SealGenerator;
}());
exports.SealGenerator = SealGenerator;
