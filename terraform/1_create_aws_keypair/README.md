This Terraform configuration generates an SSH key pair locally, registers the public key in AWS, and saves the private key to a file on your machine with secure permissions.

### Breakdown of Each Block

**1. Generate a private key**

```hcl
resource "tls_private_key" "nautilus_kp" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
```

This creates a new RSA private key using 4096 bits. Terraform holds the key in state so other resources can reference it.

**2. Create an AWS EC2 key pair**

```hcl
resource "aws_key_pair" "nautilus_kp" {
  key_name   = "nautilus-kp"
  public_key = tls_private_key.nautilus_kp.public_key_openssh
}
```

This takes the public part of the generated key and uploads it to AWS as an EC2 key pair. It allows you to SSH into EC2 instances using this key.

**3. Save the private key locally**

```hcl
resource "local_file" "nautilus_kp_pem" {
  content         = tls_private_key.nautilus_kp.private_key_pem
  filename        = "/home/bob/nautilus-kp.pem"
  file_permission = "0600"
}
```

This writes the private key to a `.pem` file on the local machine. The permission `0600` restricts access so only the owner can read the file. This is required for SSH to accept the key.

---

### References

Terraform TLS Provider Documentation: [https://registry.terraform.io/providers/hashicorp/tls/latest/docs/resources/private_key](https://registry.terraform.io/providers/hashicorp/tls/latest/docs/resources/private_key)
Terraform AWS Key Pair Resource: [https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair)
Local File Resource: [https://registry.terraform.io/providers/hashicorp/local/latest/docs/resources/file](https://registry.terraform.io/providers/hashicorp/local/latest/docs/resources/file)

