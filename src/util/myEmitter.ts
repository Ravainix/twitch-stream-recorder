import { EventEmitter } from 'events';

const myEmitter = new EventEmitter()

myEmitter.on('channelUpdate', () => console.log('emitted'))


export default myEmitter