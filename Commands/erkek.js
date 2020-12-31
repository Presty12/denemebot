const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../settings.json')

exports.run = async(client, message, args) => {

// YETKİLİ ROLLERİ   
if(!["790861621701902348", "ROLID"].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermissions('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanamazsınız!')
// YETKİLİ ROLLERİ

// ROLLER TAG LOG VE EMOJİ
const erkekrol = ayarlar.erkekrol
const erkekrol2 = ayarlar.erkekrol2
const kayıtsızrol = ayarlar.kayıtsızrol
const log = ayarlar.log
let tag = ayarlar.tag
let emoji = "<a:as3:790076480234586172>"
// ROLLER TAG LOG VE EMOJİ

// ÜYE 
const üye = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!üye) return message.channel.send('Bir üye etiketleyiniz!')
if(üye.id === message.author.id)  return message.channel.send('Kendini kayıt edemezsin bebiş!')
if(üye.id === client.user.id)  return message.channel.send('Botu kayıt edemezsin bebiş!')
if(üye.id === message.guild.OwnerID)  return message.channel.send('Sunucun sahibini kayıt edemezsin bebiş!')
//if(!message.user.username.includes(tag))  return message.channel.send('Sunucumuz taglı alımdadır lütfen üyeleri tag almadan kayıt etmeyiniz! Tagımız: \`(**tag**)\`')
if(member.roles.highest.position >= message.member.roles.highest.position)  return message.channel.send('Kendinden üstün veya aynı role sahip birini kayıt edemezsin bebiş!')
// ÜYE 

// DATA
db.add(`santa.{message.author.id}.erkek`, 1)
db.add(`santa.{message.author.id}.toplam`, 1)
let alldata = db.fetch(`santa.{message.author.id}.toplam`)
let allerkekdata = db.fetch(`santa.{message.author.id}.erkek`)
// DATA

// İSİM YAŞ
let neym = args[1]
let eyç = Number(args[2])
if(!neym) return message.channel.send('Bir isim giriniz')
if(!eyç) return message.channel.send('Bir yaş giriniz\`(Sadece Sayı Değeri Girilebilir!)\`')
if(eyç.length > 50) return message.channel.send("Yaş değeri 50'den büyük olamaz!")
if(neym.length > 15) return message.channel.send("İsimler 15 harften fazla olamaz sori dude!")
// İSİM YAŞ

üye.setNickname(`${tag} ${neym} | ${eyç}`)
üye.roles.add(erkekrol)
üye.roles.add(erkekrol2)
üye.roles.remove(kayıtsızrol)


 // ÖHM ÖHM ÖHM ÖHM SA AS SA AS SA AS SA AS ÖM ÖHM ÖHM ÖHM \\
 
 
üye.setNickname(`${tag} ${neym} | ${eyç}`)
üye.roles.add(erkekrol)
üye.roles.add(erkekrol2)
üye.roles.remove(kayıtsızrol)

const mehmud = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
${emoji} ${üye} adlı kullanıcının kaydı gerçekleşti. 
${emoji}Kullanıcıyı kaydeden yetkili ${message.author}, Verilen roller <@${erkekrol}>, <@${erkekrol2}>, Yeni ismi \`${neym} | ${eyç}\``)
.setColor("RANDOM")
.setFooter(`Güncel kayıt bilgin için .teyitsay !`)
message.channel.send(mehmud)


const logsave = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
${emoji} ${üye} adlı kullanıcının kaydı gerçekleşti. 
${emoji}Kullanıcıyı kaydeden yetkili ${message.author}, Verilen roller <@${erkekrol}>, <@${erkekrol2}>, Yeni ismi \`${neym} | ${eyç}\`, Kayıt kanalı ${message.channel.name}`)
.setColor("0x2f3136")
.setFooter(`Yetkilinin teyit bilgileri : 
Toplam \`${alldata}\` 
Toplam Erkek \`${allerkekdata}\``)
log.send(logsave)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.erkek @etiket/id İsim Yaş'
  }

