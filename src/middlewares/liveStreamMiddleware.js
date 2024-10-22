module.exports = () => {
  return async (ctx, next) => {
    await next();
    if (
      ctx.request.method === "POST" &&
      ctx.request.url.includes("api::live-stream.live-stream")
    ) {
      const liveStreamData = ctx.response.body;
      if (liveStreamData.data.status == "published") {
        if (!liveStreamData.data.live_stream) {
          const room_name = `chat_room_${liveStreamData.data.title.replace(
            " ",
            "_"
          )}`;
          const live_stream = liveStreamData.data.documentId;
          const chatRoom = await strapi
            .documents("api::chat-room.chat-room")
            .create({
              data: {
                room_name,
                live_stream,
                is_active: true,
              },
              status: "published",
            });
          const chat_room = chatRoom.documentId;
          await strapi.documents("api::live-stream.live-stream").update({
            documentId: liveStreamData.data.documentId,
            data: {
              chat_room,
            },
            status: "published",
          });
        }

        const title = `(LIVE) ${liveStreamData.data.title}`;
        const message = liveStreamData.data.description;
        const link = `/live/${liveStreamData.data.documentId}`;

        await strapi.documents("api::notification.notification").create({
          data: {
            title,
            message,
            link,
            is_active: true,
          },
          status: "published",
        });
      }
    }
  };
};
