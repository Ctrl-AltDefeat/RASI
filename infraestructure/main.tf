terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.2.0"
    }
  }
}

provider "google" {
  project     = "isis2503-terraform"
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
    access_config {
      // Ephemeral public IP
    }
  }
}

resource "google_compute_instance" "db_server" {
  machine_type              = "c3-standard-4"
  name                      = "db-server-instance"
  description               = "PostgreSQL server"
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-minimal-2204-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {
      // Ephemeral public IP
    }
  }
}

resource "null_resource" "ansible_provisioner" {
    provisioner "local-exec" {
        command = "ansible-playbook -i ${self.private_ip}, rasi.yml"
        working_dir = "${path.module}/provisioning"
        # Assuming your Ansible playbook is in a folder called 'ansible'
        # within your Terraform module.
    }
}
