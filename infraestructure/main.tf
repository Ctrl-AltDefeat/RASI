locals {
  project_id = "isis2503-terraform"
    network = "default"
    image = "ubuntu-os-cloud/ubuntu-minimal-2204-lts"
    ssh_user = "ansible"
    private_key_path = "~/.ssh/ansbile_ed25519"
}

provider "google" {
  project     = local.project_id
  credentials = file("credentials.json")
  region      = "us-central1"
  zone        = "us-central1-c"
}

resource "google_compute_instance" "web_server" {
  machine_type              = "c3-standard-4"
  name                      = "web-server-instance"
  description               = "FASTAPI RASI web server"
  allow_stopping_for_update = true

    boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-minimal-2204-lts"
    }
  }
    network_interface {
    network = "default"
    access_config {}
  }
    service_account {
        email = "terraform-sa@isis2503-terraform.iam.gserviceaccount.com"
        scopes = ["cloud-platform"]
    }
    provisioner "remote-exec" {
        inline = ["echo 'Wait until SSH is ready'"]

        connection {
            type = "ssh"
            user = local.ssh_user
            private_key = file(local.private_key_path)
            host = self.network_interface[0].access_config[0].nat_ip
        }
    }

    provisioner "local-exec" {
        command = "ansible-playbook -i ${self.network_interface[0].access_config[0].nat_ip}, --private-key ${local.private_key_path} provisioning/playbook.yml"
    }
}

output "web_server_ip" {
    description = "The public IP address of the web server"
    value = google_compute_instance.web_server.network_interface[0].access_config[0].nat_ip
}

