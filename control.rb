require 'socket'

def make_sequence s1, s2, s3, s4
  init=[85, 0, 11, 0]
  servos=[s1, s2, s3, s4].map(&:to_i)
  checksum = ((init + servos).inject(0) {|i, acc| acc += i}) % 256
  sequence = (init + servos + [0, 0, checksum]).pack("CCCCCCCCCCC")
  sequence
end

#s = TCPSocket.new('10.10.100.254', 8899)
s = TCPSocket.new('127.0.0.1', 8899)
s.send(make_sequence(0,0,0,0), 0)
s.flush
