const Database = require("../Helpers/Database");
const vt = new Database("Database", "Voice");
const mdb = new Database("Database", "Message");
const { TrimMsg } = require('../events/funcoes')
module.exports={reset}

async function reset(message) {
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return message.reply("Opps, você não tem permissões para isso");
    let deleteMessages = [];

    let msgArgs = TrimMsg(message)

    console.log(msgArgs)
    let a = false
    switch (msgArgs[1]) {
        case "all":
            vt.set(`stats.${message.guild.id}`, {});
            mdb.set(`stats.${message.guild.id}`, {});
            a = true
            break;
        case "voice":
            a = true
            vt.set(`stats.${message.guild.id}`, {});

            break;
        case "messages":
            a = true
            mdb.set(`stats.${message.guild.id}`, {});
            break;
        default:
            a = false
            message.channel.send("Opps, syntax errada `!rstats <all, voice, messages>`")
            break;
    }
    delete_Messages(deleteMessages);
    if(a)return message.reply(`Você selecionou \`${msgArgs[1]}\` | os dados foram excluídos com sucesso.`);
};


function delete_Messages(messages) {
    messages.forEach(message => {
        if(message.deletable && !message.deleted) message.delete().catch();
    });
}