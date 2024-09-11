import { Bot, InlineKeyboard } from "grammy";

// Create a new bot using the token from the .env file
const bot = new Bot("7385284091:AAFNrGKZQI4fiMcOw_3hch42L8-gWQ3h_No");

// Build the inline keyboard with a button to get client ID
const menuMarkup = new InlineKeyboard().text("Get Client ID", "get_client_id");

// Command to display the menu
bot.command("send", async (ctx) => {
  await ctx.reply("Click the button to get your Client ID:", {
    reply_markup: menuMarkup,
  });
});

// Handle button click for "Get Client ID"
bot.callbackQuery("get_client_id", async (ctx) => {
  const chatId = ctx.chat?.id;
  const userName = ctx.from?.first_name || "User";
  if (chatId) {
    await ctx.answerCallbackQuery(); // Acknowledge the button click
    await ctx.reply(
      `Hello ${userName}, your Client ID (Chat ID) is: ${chatId}`
    );
    console.log(`${userName},get His Client ID: ${chatId}`);
  } else {
    await ctx.reply("Sorry, I couldn't retrieve your Client ID.");
  }
});

// Message handler for any message
bot.on("message", async (ctx) => {
  await ctx.reply("For Client_ID please type the command /send.");
});

bot.start();
