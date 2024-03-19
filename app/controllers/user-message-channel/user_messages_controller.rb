# frozen_string_literal: true

module UserMessageChannel
  class UserMessagesController < ::ApplicationController
    requires_plugin UserMessageChannel::PLUGIN_NAME

    def send_message_bus_message
      MessageBus.publish("/user-messages/#{params[:user_id].to_i}", {
        type: params[:type],
        title: params[:title],
        text: params[:text],
      })

      render json: { success: true }
    end
  end
end
