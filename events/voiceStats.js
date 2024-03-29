
const { client } = require('../index')
const db = require('quick.db')
const config = require('../config')

const Activites = new Map();
const channel = client.channels.cache.get(config.channels.movs)
try{
client.on('voiceStateUpdate', async (oldState, newState) => {
    if(oldState.member.roles.cache.has(config.roles.movcall) || newState.member.roles.cache.has(config.roles.movcall)){
    if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    if((newState.mute))return
    else if(!oldState.mute || !newState.mute) {
        
    if(!oldState.channel && newState.channel) {
        Activites.set(oldState.id, Date.now());
        await channel.send({embeds: [{description: `${newState.member}\nentrou na call <#${newState.channelId}>`, color:newState.member.displayHexColor}]})
        
    }

    let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); // checa dado
    }
    
    else
        data = Activites.get(oldState.id);
    let duration = Date.now() - data;
    

    if(oldState.channel && !newState.channel) { // sai call
        Activites.delete(oldState.id);
    
        db.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelId}`, duration);
        db.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
        await channel.send({embeds: [{description: `${oldState.member}\nsaiu da call <#${oldState.channelId}>`, color:oldState.member.displayHexColor}]})
    }

    else if(oldState.channel && newState.channel){ // troca call
        Activites.set(oldState.id, Date.now());
        db.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelId}`, duration);
        db.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    }
}}});
}catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}
