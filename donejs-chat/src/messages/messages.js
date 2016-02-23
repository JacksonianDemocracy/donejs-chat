import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './messages.less!';
import template from './messages.stache!';
import Message from '../models/message';
import io from 'steal-socket.io';

export const ViewModel = Map.extend({
  send(event) {
    event.preventDefault();

    new Message({
      name: this.attr('name'),
      body: this.attr('body')
    }).save().then(msg => this.attr('body', ''));
  }
});

tag('message-model', messageConnection);
const socket = io('http://chat.donejs.com');

socket.on('messages created',
  message => messageConnection.createInstance(message));
socket.on('messages updated',
  message => messageConnection.updateInstance(message));
socket.on('messages removed',
  message => messageConnection.destroyInstance(message));


export default Message;
