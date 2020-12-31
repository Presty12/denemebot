const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);



client.on("guildMemberAdd", member => {
  member.roles.add('790861621479211017'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});



client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};
const emoji = global.emoji;

const sayiEmojiler = {
  0: "<a:0_:789364015980609566>",  // SAYI EMOJİ İD
  1: "<a:1_:789364017671962624>",  // SAYI EMOJİ İD
  2: "<a:2_:789364018455773184>",  // SAYI EMOJİ İD
  3: "<a:3_:789364018262704159>",  // SAYI EMOJİ İD
  4: "<a:4_:789364018371362826>",  // SAYI EMOJİ İD
  5: "<a:5_:789364018191925251>",  // SAYI EMOJİ İD
  6: "<a:6_:789364018786729986>",  // SAYI EMOJİ İD
  7: "<a:7_:789364018146050059>",  // SAYI EMOJİ İD
  8: "<a:8_:789364018874810369>",  // SAYI EMOJİ İD
  9: "<a:9_:789364018322210837>"   // SAYI EMOJİ İD
};

client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
    yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};


client.on("guildMemberAdd", member => {
    const kanal = member.guild.channels.cache.find(r => r.id === "790861621743714362");
    const register = "<@&790861621701902348>"
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();

    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Güvenli değil'
  if (kurulus > 1296000000) kontrol = 'Güvenli'
    moment.locale("tr");
      const log = new Discord.MessageEmbed()
        .setColor("0x2f3136")
      .setAuthor(member.guild.name)
  .setDescription(`
:christmas_tree: ${member} **adlı üye aramıza katıldı, seninle toplam ${client.emoji(`${member.guild.memberCount}`)} kişiye ulaştık.**
:christmas_tree: ${register} **rolündeki yetkililer seninle ilgilenecektir.**
:christmas_tree: **Sunucumuza kayıt olmak için sese girip teyit vermen gerekmektedir.**
:christmas_tree: **Hesabınızın Oluşturulma Tarihi:** ${kurulus}
:christmas_tree: **Bu Hesap :** __${kontrol}__`)
   kanal.send(log)
     kanal.send(register)
  });






client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '⍭'
  const sunucu = '790861621386936330'
  const kanal = '790861628153266203'
  const rol = '790861621605564466'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`${newUser} Adlı Kullanıcı Tagımızı (${tag}) Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda Tagımızı (${tag}) Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(`${newUser} Adlı Kullanıcı Tagımızı (${tag}) Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda Tagımızı (${tag}) Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});




client.on("guildMemberAdd", member => {
let tag = ayarlar.yasaktag
let kayıtsız = "787985087529877515"
let cezalı = "787988311166681089"
if(member.user.username.includes(tag)){
member.roles.add(cezalı)
member.roles.remove(kayıtsız)
member.send(`${member.guild.name} adlı sunucumuzda yasaklı taglardan birini adında bulunduruyorsun. Yasaklı taglar listesi ;
  ${ayarlar.yasaktag}`)

}

})



client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('790861621386936330'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "⍭"; // Buraya Ekip Tag
  var tagrol = "790861621605564466"; // Buraya Ekip Rolünün ID
  var kanal = "790861628153266203"; // Loglanacağı Kanalın ID

  if (!sunucu.members.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;

  if ((yeni.username).includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) { console.error(err) };
  };

  if (!(yeni.username).includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.filter(rol => rol.position >= sunucu.roles.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch(err) { console.error(err) };
  };
});
