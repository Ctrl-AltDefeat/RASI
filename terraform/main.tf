provider "google"{
  project = "isis2503-proyectog4"
  credentials = "${file("credentials.json")}"
  region = "us-central1"
  zone = "us-central1-c"
}

resource "google_compute_instance" "web_server_instance" {
  machine_type = "c3-standard-4"
  name         = "web-server"
  zone         = "us-central1-a"
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-minimal-2204-lts"

    }
  }

  network_interface {
    network = "default"
    access_config {
      //necessary even empty.
    }
  }
}

resource "google_compute_instance" "db_server_instance" {
  machine_type = "c3-standard-4"
  name         = "db-server"
  zone         = "us-central1-a"
  allow_stopping_for_update = true

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-minimal-2204-lts"

    }
  }

  network_interface {
    network = "default"
    access_config {
      //necessary even empty.
    }
  }
}


output "instance_ips" {
  value = [
    google_compute_instance.web_server_instance.network_interface.0.network_ip,
    google_compute_instance.db_server_instance.network_interface.0.network_ip
  ]
}
