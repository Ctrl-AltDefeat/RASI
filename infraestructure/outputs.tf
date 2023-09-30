output "private_instance_ip_out" {
  value = [
    google_compute_instance.web_server.network_interface.0.network_ip,
    google_compute_instance.db_server.network_interface.0.network_ip
  ]
  description = "GCP private instance ip(They are ephemeral)"
  sensitive   = true
}
