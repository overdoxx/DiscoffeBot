const config = require("../config.js");
const { client } = require("../index");

module.exports={edit}
   

    async function edit (message) {
        try{
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return
        var msgArgs = message.content.split(" ");
        if((/^<[@][!&]?[0-9]+>$/.test(msgArgs[1]) || /[0-9]+/.test(msgArgs[1]))){
            if((/^<[@][!&]?[0-9]+>$/.test(msgArgs[2]) || /[0-9]+/.test(msgArgs[2]))){
                if(msgArgs[3]){
                    let msgedit = message.content.substring(msgArgs.slice(0, 3).join(" ").length + 1);
                    console.log(msgedit)
                    if(msgedit.length > 2000) return msg.channel.send(msg.author.toString()+" Mensagem invalida. Verifique seu conteudo")
                    const canal = client.channels.cache.find(channel =>channel.id === msgArgs[1])
                    if(canal==undefined){
                        message.channel.send({content: msg.author.toString(), embeds:[{
                            description:"Não foi possivel achar o canal",
                            color: config.color.err
                        }]})
                    }else{
                    canal.messages.fetch(msgArgs[2]).catch(msg=>{
                        message.channel.send({content: msg.author.toString(), embeds:[{
                            description:"Você precisa me dar uma mensagem valida",
                            color: config.color.err,
                        }]})
                    }).then(messagem => {
                        if(!messagem){
                            return;
                        }else   
                        messagem.edit(msgedit);
                        message.channel.send(message.author.toString()+" Mensagem edita com sucesso em " + messagem.channel.name)
                    })
                    
                    }
                }else {

                    message.channel.send({content: message.author.toString(), embeds:[{
                        description:"Como irei modificar o manuscrito se você não me enviou o conteudo?",
                        color: config.color.err,
                    }]})
                }
            
            }
        else{
            message.channel.send({content: message.author.toString(), embeds:[{
                description:"Como irei modificar o manuscrito se não me enviou o id da mensagem?",
                color: config.color.err,
            }]})
        }
        }
        else{
            message.channel.send({content: message.author.toString(), embeds:[{
                description:"Você precisa mencionar o canal primeiro",
                color: config.color.err,
            }]})
        }
    }catch(err) {
        const emb = embed.get(`Err!`, 1)
        msg.channel.send({ embeds: [emb] });
        msg.delete();
    
        const channel = client.channels.cache.get('889666042740244510')
        logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
        channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
    }


    }
