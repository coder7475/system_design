resource "tls_private_key" "nautilus_kp" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "nautilus_kp" {
  key_name   = "nautilus-kp"
  public_key = tls_private_key.nautilus_kp.public_key_openssh
}

resource "local_file" "nautilus_kp_pem" {
  content         = tls_private_key.nautilus_kp.private_key_pem
  filename        = "/home/bob/nautilus-kp.pem"
  file_permission = "0600"
}

