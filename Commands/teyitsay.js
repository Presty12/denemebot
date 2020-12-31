const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
exports.run = async(client, message, args) => {

if(!["790861621701902348", "ROLID"].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermissions('ADMINISTRATOR')) return message.channel.send('Bu Komudu Kullanamazsınız')

let member = message.member.mentions.first()

if(!member){
let erkek = db.fetch(`santa.${message.author.id}.erkek`)
let kadın = db.fetch(`santa.${message.author.id}.kız`)
let toplam = db.fetch(`santa.${message.author.id}.toplam`)
if(erkek === null) erkek = "0"
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(toplam === null) toplam = "0"
if(toplam === undefined) toplam = "0"

const embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription(`
Toplam \`${toplam}\` adet teyitin var.
Toplam \`${erkek}\` adet erkek teyitin var.
Topam \`${kadın}\` adet kız teyitin var.`)
.setColor("0x2f3136")
return message.channel.send(embed)
};

if(!member){
  let erkek1 = db.fetch(`santa.${member.id}.erkek`)
  let kadın1 = db.fetch(`santa.${member.id}.kız`)
  let toplam1 = db.fetch(`santa.${member.id}.toplam`)
  if(erkek1 === null) erkek = "0"
  if(erkek1 === undefined) erkek = "0"
  if(kadın1 === null) kadın = "0"
  if(kadın1 === undefined) kadın = "0"
  if(toplam1 === null) toplam = "0"
  if(toplam1 === undefined) toplam = "0"
const embed2 = new MessageEmbed()
.setAuthor(member.username, member.avatarURL)
.setDescription(`
Yetkilinin toplam \`${toplam1}\` adet teyiti var.
Yetkilinin toplam \`${erkek1}\` adet erkek teyiti var.
Yetkilinin topam \`${kadın1}\` adet kız teyiti var.`)
.setColor("0x2f3136")
return message.channel.send(embed2)

};


};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayıtsay', 'kbilgi', 'ksay', 'tbilgi'],
    permLevel: 0
  }

  exports.help = {
    name: 'teyitsay',
    description: "Kayıt bilgilerini gösterir",
    usage: '.teyitsay / .teyitsay @etiket'
  }
