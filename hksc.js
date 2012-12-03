// Hobby King Servo Controller Client

var net = require('net');

var hksc = {
  connect: function(options, callback) {
    var self = this;
    this.client = net.connect(options, function() {
      console.log('client connected');
      if (callback) {
        callback(self);
      }
    });
    return this;
  },

  checksum: function(arr) {
    var sum = 0;
    for (i in arr) { sum += arr[i] }
    return sum % 256;
  },

  makeSequence: function(s0, s1, s2, s3) {
    // 55 00 0b 00 SERVO-0 SERVO-1 SERVO-2 SERVO-3 00 00 CHECKSUM
    var seq = [0x55, 0x00, 0x0b, 0x00, s0, s1, s2, s3, 0x00, 0x00]
    var sum = this.checksum(seq);
    return seq.concat([sum]);
  },

  send: function(s0, s1, s2, s3) {
    var buffer = new Buffer(11);
    var bytes = new Uint8Array(buffer);
    var sequence = this.makeSequence(s0, s1, s2, s3);
    for (var i in sequence) {
      bytes[i] = sequence[i];
    }
    console.log('sending byte sequence', buffer);

    this.client.write(buffer);
  }
};

module.exports = hksc;
