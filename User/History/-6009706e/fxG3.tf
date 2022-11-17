terraform {
  backend "gcs" {
    bucket = "terraform-state-hoxhunt-dev-sre"
    prefix = "terraform/state"
  }
}

provider "google" {
  region  = "europe-west1"
  project = "hoxhunt-dev-sre"
}

provider "google-beta" {
  region  = "europe-west1"
  project = "hoxhunt-dev-sre"
}

provider "archive" {}

locals {
  project                                 = "hoxhunt-dev-sre"
  location                                = "EU"
  region                                  = "europe-west1"
  domain                                  = "hoxhunt-sre.dev"
  cert_validation_subdomain               = "acme"
  internal_domain                         = "hoxinternal-sre.dev"
  internal_cert_validation_subdomain      = "acme"
  mail_delivery_domain                    = "unicornmx.dev"
  mail_delivery_cert_validation_subdomain = "acme-sre"
  env                                     = "develop-sre"

  bastion_subnetwork_ip_range = "192.168.240.0/26"

  iam_os_login_users = []

  iam_project_owners = [
    "pyry.avist@hoxhunt.com",
    "sten.hagglund@hoxhunt.com",
    "riku.laakkola@hoxhunt.com",
  ]

  iam_project_sres = [
    "riku.laakkola@hoxhunt.com",
  ]

  iam_project_data_scientists               = []
  iam_project_product_analysts              = []

  iam_threat_storage_object_viewers = [
    "pyry.avist@hoxhunt.com",
    "sten.hagglund@hoxhunt.com",
  ]

  iam_trace_exporter_service_accounts = [
    "serviceAccount:export-000000b7e275eee6-7584@gcp-sa-cloud-trace.iam.gserviceaccount.com"
  ]

  iam_project_developers = []

  dns_google_site_verification_token = "google-site-verification=IfVEYAWHnCdeUrl86AaLBD5LUd1gD4LKjb3RgRJ9sII"

  monitoring_alert_email = "notifications-sre-develop-sre@hoxhunt.com"

  // GKE reserved prefixes in our scheme for expandability to future clusters:
  // 192.168.0.0/16 (i.e. whole space)
  // 10.0.0.0 - 10.131.255.255, of which 10.2.0.0 - 10.3.255.255 is reserved for services
  // This allows a total of 32 large-ish clusters.
  gke_cluster_name                                = "primary-eu-6"
  gke_primary_node_pool_machine_type              = "n2-standard-4"
  gke_cluster_masters_ip_range                    = "172.16.0.0/28"
  gke_subnetwork_ip_range                         = "192.168.0.0/20"
  gke_subnetwork_pod_ip_range                     = "10.4.0.0/14"
  gke_subnetwork_service_ip_range                 = "10.2.0.0/20"
  gke_primary_node_pool_name                      = "primary-${local.gke_primary_node_pool_machine_type}-ssd"
  gke_loki_node_pool_machine_type                 = "n1-standard-1"
  gke_loki_node_pool_name_preemptible             = "loki-${local.gke_loki_node_pool_machine_type}-ssd-pe"
  gke_mlops_node_pool_machine_type                = "n1-standard-1"
  gke_mlops_node_pool_name                        = "mlops-${local.gke_mlops_node_pool_machine_type}-ssd"
  gke_tasks_node_pool_machine_type                = "n1-standard-1"
  gke_tasks_node_pool_name                        = "tasks-${local.gke_tasks_node_pool_machine_type}-ssd"
  gke_tasks_heavy_node_pool_machine_type          = "n1-standard-4"
  gke_tasks_heavy_node_pool_name                  = "tasks-h-${local.gke_tasks_heavy_node_pool_machine_type}-ssd"
  gke_clickhouse_analytics_node_pool_machine_type = "n1-standard-1"
  gke_clickhouse_analytics_node_pool_name         = "ch-a-${local.gke_clickhouse_analytics_node_pool_machine_type}" # max 40 chars, prefixed with cluster name
  gke_zookeeper_node_pool_machine_type            = "n1-standard-1"
  gke_zookeeper_node_pool_name                    = "zk-${local.gke_zookeeper_node_pool_machine_type}" # max 40 chars, prefixed with cluster name

  // Internal load balancer reserved prefixes in our scheme for expandability:
  // 172.19.0.0/16 (i.e. whole space under 172.19.0.0)
  // Regional reservation, use only a small subset of the whole reserved range (172.19.0.0 - 172.19.0.255)
  internal_load_balancer_subnetwork_ip_range = "172.19.0.0/24"
  internal_load_balancer_clickhouse_ip       = "172.19.0.2"

  // Cloud Composer GKE reserved prefixes in our scheme for expandability to future clusters:
  // 172.20.0.0/16 (i.e. whole space under 172.20.0.0)
  // 10.200.0.0 - 10.231.255.255, of which 10.2.0.0 - 10.2.255.255 is reserved for services
  cloud_composer_cluster_name        = "cloud-composer-1"
  cloud_composer_storage_bucket_name = "europe-west1-cloud-composer-370bc1e5-bucket"

  cloud_composer_cluster_machine_type        = "n1-standard-1"
  cloud_composer_cluster_masters_ip_range    = "172.20.0.0/28"
  cloud_composer_subnetwork_ip_range         = "172.20.16.0/20"
  cloud_composer_subnetwork_pod_ip_range     = "10.204.0.0/14"
  cloud_composer_subnetwork_service_ip_range = "10.200.0.0/20"

  // The release agent does not need a lot of instances so bind it to the cloud compose IP range
  gke_release_agent_cluster_name                = "release-agent"
  gke_release_agent_cluster_masters_ip_range    = "172.20.0.16/28"
  gke_release_agent_subnetwork_ip_range         = "172.20.32.0/20"
  gke_release_agent_subnetwork_pod_ip_range     = "10.208.0.0/16"
  gke_release_agent_subnetwork_service_ip_range = "10.200.16.0/20"

  // Google Managed Services reserved prefixes in our scheme for expandability to future services:
  // 172.21.0.0/16 (i.e. whole space under 172.21.0.0)
  google_managed_services_ip_range = "172.21.0.0/16"

  // Dataflow reserved prefixes in our scheme for expandability to future services:
  // 172.22.0.0/16 (i.e. whole space under 172.22.0.0)
  dataflow_subnetwork_ip_range = "172.22.0.0/16"

  // Internal application metadata database configuration
  internal_application_metadata_instances_machine_type = "db-custom-1-3840"
  internal_application_metadata_instances_master_name  = "internal-application-metadata"
  analytics_postgres_replica_machine_type              = "db-custom-1-3840"
  analytics_postgres_replica_master_name               = "analytics"
  analytics_postgres_replica_database_version          = "POSTGRES_13"

  pub_sub_push_subscriptions = {}

  // Must be in sync with `atlas_ip_range` in
  // infrastructure/env/develop-sre/terraform_mongo_atlas/main.tf
  // CANNOT BE CHANGED AFTER CREATION!
  mongo_atlas_ip_range = "172.23.0.0/16"

  peered_networks = {
    mongo_atlas = {
      name = "mongo-atlas"
      // The below values come from the outputs of
      // infrastructure/env/develop-sre/terraform/main.tf or alternatively from
      // https://cloud.mongodb.com/v2/60a4be36418735633213202d#security/network/peering
      external_project_id = "p-3munbzelkbisjhiuj47zunq2"
      external_vpc_name   = "nt-60a4bfb24ce6b74e0dc89d61-jrkxifkb"
    }
  }

  serverless_egress_subnetwork_ip_range = "10.101.0.0/28" // Must be a /28 netmask: https://cloud.google.com/run/docs/configuring/connecting-vpc#create-connector
}

module "project" {
  source = "../../../terraform/modules/gcp/project"

  project                               = local.project
  google_managed_services_address       = split("/", local.google_managed_services_ip_range)[0]
  google_managed_services_prefix_length = tonumber(split("/", local.google_managed_services_ip_range)[1])
  peered_networks                       = local.peered_networks
}

module "iam" {
  source = "../../../terraform/modules/gcp/iam"

  project                                                 = local.project
  project_os_login_users                                  = local.iam_os_login_users
  project_owners                                          = local.iam_project_owners
  project_sres                                            = local.iam_project_sres
  project_data_scientists                                 = local.iam_project_data_scientists
  project_product_analysts                                = local.iam_project_product_analysts
  project_threat_storage_object_viewers                   = local.iam_threat_storage_object_viewers
  project_trace_exporter_iam_service_accounts             = local.iam_trace_exporter_service_accounts
  threat_storage_bucket_name                              = module.gcs.threat_storage_bucket_name
  threat_feature_data_bucket_name                         = module.gcs.threat_feature_data_bucket_name
  infra_api_storage_bucket_name                           = module.gcs.infra_api_storage_bucket_name
  cloud_composer_storage_bucket_name                      = local.cloud_composer_storage_bucket_name
  ms_alerts_api_events_storage_bucket_name                = module.gcs.ms_alerts_api_events_storage_bucket_name
  ms_customer_gateway_data_storage_bucket_name            = module.gcs.ms_customer_gateway_data_storage_bucket_name
  analytics_storage_bucket_name                           = module.gcs.analytics_storage_bucket_name
  analytics_backup_storage_bucket_name                    = module.gcs.analytics_backup_storage_bucket_name
  analytics_ingest_event_files_bucket_name                = module.gcs.analytics_ingest_event_files_bucket_name
  analytics_ingest_dead_letter_queue_pubsub_topic         = module.pubsub.analytics_ingest_dead_letter_queue_topic
  analytics_ingest_event_source_pubsub_subscription       = module.pubsub.analytics_ingest_event_source_subscription
  analytics_ingest_cubes_source_pubsub_subscription       = module.pubsub.analytics_ingest_cubes_source_subscription
  analytics_ingest_event_files_source_pubsub_subscription = module.pubsub.analytics_ingest_event_files_source_subscription
  analytics_ingest_event_source_pubsub_topic              = module.pubsub.analytics_ingest_event_source_topic
  analytics_ingest_event_files_source_pubsub_topic        = module.pubsub.analytics_ingest_event_files_source_topic
  analytics_ingest_dead_letter_queue_topic_pubsub_default = module.pubsub.analytics_ingest_dead_letter_queue_topic_pubsub_default
  analytics_ingest_dead_letter_queue_subscription         = module.pubsub.analytics_ingest_dead_letter_queue_subscription
  analytics_processing_event_source_subscription          = module.pubsub.analytics_processing_event_source_subscription
  analytics_processing_dead_letter_queue_subscription     = module.pubsub.analytics_processing_dead_letter_queue_subscription
  analytics_processing_dead_letter_queue_topic            = module.pubsub.analytics_processing_dead_letter_queue_topic
  analytics_cubes_ingest_pubsub_topic                     = module.pubsub.analytics_cubes_ingest_pubsub_topic
  threat_dump_parsing_event_source_pubsub_topic           = module.pubsub.threat_dump_parsing_event_source_pubsub_topic
  threat_dump_parsing_file_event_subscription             = module.pubsub.threat_dump_parsing_file_event_subscription
  cloudflare_logs_import_event_source_pubsub_topic        = module.pubsub.cloudflare_logs_import_event_source_pubsub_topic
  cloudflare_logs_import_file_event_subscription          = module.pubsub.cloudflare_logs_import_file_event_subscription
  threat_dump_parsing_bucket_name                         = module.gcs.ml_training_data_storage_bucket_name
  application_storage_bucket_name                         = module.gcs.application_storage_bucket_name
  cloud_build_storage_bucket_name                         = module.gcs.cloud_build_storage_bucket_name
  loki_chunk_storage_bucket_name                          = module.gcs.loki_chunk_storage_bucket_name
  tempo_storage_bucket_name                               = module.gcs.tempo_storage_bucket_name
  cloudflare_logs_storage_bucket_name                     = module.gcs.cloudflare_logs_storage_bucket_name
  cloud_functions_storage_bucket_name                     = module.gcs.cloud_functions_storage_bucket_name
  ml_training_data_storage_bucket_name                    = module.gcs.ml_training_data_storage_bucket_name
  ml_notebook_sync_data_storage_bucket_name               = module.gcs.ml_notebook_sync_data_storage_bucket_name
  analytics_customer_reports_bucket_name                  = module.gcs.analytics_customer_reports_bucket_name
  quest_template_images_storage_bucket_name               = module.gcs.quest_template_images_storage_bucket_name
  admin_csv_export_temporary_storage_bucket_name          = module.gcs.admin_csv_export_temporary_storage_bucket_name
  public_bucket_name                                      = module.gcs.public_bucket_name
  sops_key_ring_id                                        = module.sops.key_ring_id
  cloud_functions_crypto_key_id                           = module.sops.cloud_functions_crypto_key_id
  encrypted_secrets_bucket_name                           = module.gcs.encrypted_secrets_bucket_name
  env                                                     = local.env
  customer_secrets_key_id                                 = module.kms.customer_secrets_key_id
  infra_api_dkim_private_keys_key_id                      = module.kms.infra_api_dkim_private_keys_key_id
  image_attestation_key_id                                = module.kms.image_attestation_key_id
  customer_provided_secrets_virustotal_key_id             = module.kms.customer_provided_secrets_virustotal_key_id
  project_developers                                      = local.iam_project_developers

  analytics_ingest_clickhouse_event_source_pubsub_subscription     = module.pubsub.analytics_ingest_clickhouse_event_source_subscription
  analytics_ingest_clickhouse_cubes_source_pubsub_subscription     = module.pubsub.analytics_ingest_clickhouse_cubes_source_subscription
  analytics_ingest_clickhouse_dead_letter_queue_pubsub_topic       = module.pubsub.analytics_ingest_clickhouse_event_dead_letter_queue_topic
  analytics_ingest_clickhouse_event_dead_letter_queue_subscription = module.pubsub.analytics_ingest_clickhouse_event_dead_letter_queue_subscription
  analytics_ingest_clickhouse_connection_url_secret_id             = module.secret_manager.analytics_ingest_clickhouse_connection_url_secret_id
}

module "secret_manager" {
  source = "../../../terraform/modules/gcp/secret_manager"

  project = local.project
}

module "bastion" {
  source = "../../../terraform/modules/gcp/bastion"

  project                       = local.project
  bastion_name                  = "bastion-${local.region}"
  bastion_service_account_email = module.iam.bastion_service_account_email
  bastion_region                = local.region
  network_name                  = module.project.primary_network_name
  subnetwork_name               = "${module.project.primary_network_name}-${local.region}-bastion-subnet"
  subnetwork_ip_range           = local.bastion_subnetwork_ip_range
}

module "gke_private_cluster" {
  source = "../../../terraform/modules/gcp/gke_private_cluster"

  project                     = local.project
  region                      = local.region
  cluster_name                = local.gke_cluster_name
  cluster_masters_ip_range    = local.gke_cluster_masters_ip_range
  network_name                = module.project.primary_network_name
  subnetwork_name             = "${module.project.primary_network_name}-${local.region}-subnet"
  subnetwork_ip_range         = local.gke_subnetwork_ip_range
  subnetwork_pod_ip_range     = local.gke_subnetwork_pod_ip_range
  subnetwork_service_ip_range = local.gke_subnetwork_service_ip_range

  cluster_master_authorized_networks = [
    {
      name             = module.bastion.name
      allowed_ip_range = module.bastion.subnetwork_ip_range
    },
    {
      name             = local.cloud_composer_cluster_name
      allowed_ip_range = local.cloud_composer_subnetwork_ip_range
    },
    {
      name             = "${local.cloud_composer_cluster_name}-pods"
      allowed_ip_range = local.cloud_composer_subnetwork_pod_ip_range
    },
    {
      name             = local.gke_release_agent_cluster_name
      allowed_ip_range = local.gke_release_agent_subnetwork_ip_range
    },
    {
      name             = "${local.gke_release_agent_cluster_name}-pods"
      allowed_ip_range = local.gke_release_agent_subnetwork_pod_ip_range
    }
  ]

  cluster_node_pools = [
    {
      name                  = local.gke_primary_node_pool_name
      service_account_email = module.iam.gke_primary_node_pool_service_account_email
      machine_type          = local.gke_primary_node_pool_machine_type
      preemptible           = false
      min_node_count        = 3
      max_node_count        = 32
      local_ssd_count       = 0
      disk_size_gb          = 50
      taints                = []
      labels                = {}
    },
    {
      name                  = local.gke_loki_node_pool_name_preemptible
      service_account_email = module.iam.gke_primary_node_pool_service_account_email
      machine_type          = local.gke_loki_node_pool_machine_type
      preemptible           = true
      min_node_count        = 1
      max_node_count        = 5
      local_ssd_count       = 0
      disk_size_gb          = 50
      taints = [
        {
          key    = "cloud.google.com/gke-preemptible"
          value  = "true"
          effect = "NO_SCHEDULE"
        },
        {
          key    = "app"
          value  = "loki"
          effect = "NO_SCHEDULE"
        }
      ]
      labels = {
        "app" = "loki"
      }
    },
    {
      name                  = local.gke_mlops_node_pool_name
      service_account_email = module.iam.gke_primary_node_pool_service_account_email
      machine_type          = local.gke_mlops_node_pool_machine_type
      preemptible           = false
      min_node_count        = 0
      max_node_count        = 1
      local_ssd_count       = 0
      disk_size_gb          = 50
      taints = [
        {
          key    = "app"
          value  = "jupyterlab"
          effect = "NO_SCHEDULE"
        }
      ]
      labels = {
        "app" = "jupyterlab"
      }
    },
    {
      name                  = local.gke_tasks_node_pool_name
      service_account_email = module.iam.gke_primary_node_pool_service_account_email
      machine_type          = local.gke_tasks_node_pool_machine_type
      preemptible           = false
      min_node_count        = 0
      max_node_count        = 5
      local_ssd_count       = 0
      disk_size_gb          = 500
      taints = [
        {
          key    = "app"
          value  = "tasks"
          effect = "NO_SCHEDULE"
        }
      ]
      labels = {
        "app" = "tasks"
      }
    },
    {
      name                  = local.gke_tasks_heavy_node_pool_name
      service_account_email = module.iam.gke_primary_node_pool_service_account_email
      machine_type          = local.gke_tasks_heavy_node_pool_machine_type
      preemptible           = false
      min_node_count        = 0
      max_node_count        = 5
      local_ssd_count       = 0
      disk_size_gb          = 20
      taints = [
        {
          key    = "app"
          value  = "tasks-heavy"
          effect = "NO_SCHEDULE"
        }
      ]
      labels = {
        "app" = "tasks-heavy"
      }
    },
    {
      name                  = local.gke_clickhouse_analytics_node_pool_name
      service_account_email = module.iam.gke_primary_node_pool_service_account_email
      machine_type          = local.gke_clickhouse_analytics_node_pool_machine_type
      preemptible           = false
      min_node_count        = 0
      max_node_count        = 5
      local_ssd_count       = 0
      disk_size_gb          = 50
      taints = [
        {
          key    = "app"
          value  = "clickhouse-analytics"
          effect = "NO_SCHEDULE"
        }
      ]
      labels = {
        "app" = "clickhouse-analytics"
      }
    },
    {
      name                  = local.gke_zookeeper_node_pool_name
      service_account_email = module.iam.gke_primary_node_pool_service_account_email
      machine_type          = local.gke_zookeeper_node_pool_machine_type
      preemptible           = false
      min_node_count        = 1
      max_node_count        = 1
      local_ssd_count       = 0
      disk_size_gb          = 50
      taints = [
        {
          key    = "app"
          value  = "zookeeper"
          effect = "NO_SCHEDULE"
        }
      ]
      labels = {
        "app" = "zookeeper"
      }
    }
  ]
}

module "gke_release_agent" {
  source = "../../../terraform/modules/gcp/gke_private_cluster"

  project                     = local.project
  region                      = local.region
  cluster_name                = local.gke_release_agent_cluster_name
  cluster_masters_ip_range    = local.gke_release_agent_cluster_masters_ip_range
  network_name                = module.project.primary_network_name
  subnetwork_name             = "${module.project.primary_network_name}-${local.region}-subnet-gke-release-agent"
  subnetwork_ip_range         = local.gke_release_agent_subnetwork_ip_range
  subnetwork_pod_ip_range     = local.gke_release_agent_subnetwork_pod_ip_range
  subnetwork_service_ip_range = local.gke_release_agent_subnetwork_service_ip_range
  nat_prefix                  = local.gke_release_agent_cluster_name
  use_autopilot               = true
  use_stackdriver             = true

  cluster_master_authorized_networks = [
    // allow bastion temporarily, needs to be taken away before full roll-out
    // requires cloud build/agents to integrate somehow differently for auto-deploy
    {
      name             = module.bastion.name
      allowed_ip_range = module.bastion.subnetwork_ip_range
    }
  ]
}

module "binary_authorization" {
  source = "../../../terraform/modules/gcp/binary_authorization"

  project                  = local.project
  image_attestation_key_id = module.kms.image_attestation_key_id
}

module "cloud_composer_cluster" {
  source = "../../../terraform/modules/gcp/cloud_composer_cluster"

  project                       = local.project
  region                        = local.region
  cluster_name                  = local.cloud_composer_cluster_name
  cluster_service_account_email = module.iam.cloud_composer_cluster_service_account_email
  cluster_machine_type          = local.cloud_composer_cluster_machine_type
  cluster_masters_ip_range      = local.cloud_composer_cluster_masters_ip_range
  network_name                  = module.project.primary_network_name
  subnetwork_name               = "${local.cloud_composer_cluster_name}-subnet"
  subnetwork_ip_range           = local.cloud_composer_subnetwork_ip_range
  subnetwork_pod_ip_range       = local.cloud_composer_subnetwork_pod_ip_range
  subnetwork_service_ip_range   = local.cloud_composer_subnetwork_service_ip_range
  application_gke_cluster_name  = module.gke_private_cluster.name
}

module "firewall" {
  source = "../../../terraform/modules/gcp/firewall"

  project                    = local.project
  bastion_instance_tags      = module.bastion.instance_tags
  network_name               = module.project.primary_network_name
  cluster_masters_ip_range   = module.gke_private_cluster.masters_ip_range
  cluster_webhook_node_tags  = module.gke_private_cluster.node_pool_tags_by_name[local.gke_primary_node_pool_name]
  cloud_composer_worker_tags = module.cloud_composer_cluster.worker_node_tags

  release_agent_cluster_masters_ip_range = module.gke_release_agent.masters_ip_range
}

module "dns" {
  source = "../../../terraform/modules/gcp/dns"

  project                   = local.project
  domain                    = local.domain
  cert_validation_subdomain = local.cert_validation_subdomain
}

module "internal_domain_dns" {
  source = "../../../terraform/modules/gcp/dns"

  project                   = local.project
  domain                    = local.internal_domain
  cert_validation_subdomain = local.internal_cert_validation_subdomain
}

module "mail_delivery_domain_dns" {
  source = "../../../terraform/modules/gcp/dns"

  project                   = local.project
  domain                    = local.mail_delivery_domain
  cert_validation_subdomain = local.mail_delivery_cert_validation_subdomain
}

module "load_balancer" {
  source = "../../../terraform/modules/gcp/load_balancer"

  project                              = local.project
  load_balancer_ip_region              = local.region
  internal_load_balancers_subnetwork   = module.network.internal_load_balancer_subnetwork
  internal_load_balancer_clickhouse_ip = local.internal_load_balancer_clickhouse_ip
}

module "sops" {
  source = "../../../terraform/modules/gcp/sops"

  project = local.project
  region  = local.region
}

module "monitoring" {
  source = "../../../terraform/modules/gcp/monitoring"

  project                       = local.project
  notification_email            = local.monitoring_alert_email
  enable_analytics_monitoring   = true
  analytics_events_pubsub_topic = module.pubsub.analytics_ingest_event_source_topic
  enable_binauth_monitoring     = true
}

module "gcs" {
  source = "../../../terraform/modules/gcp/gcs"

  project                   = local.project
  domain                    = local.domain
  location                  = local.location
  public_bucket_cors_origin = ["*.${local.domain}"]
}

module "big_query" {
  source = "../../../terraform/modules/gcp/big_query"

  project                        = local.project
  analytics_dataset              = module.iam.analytics_dataset_name
  analytics_cubes_dataset        = module.iam.analytics_cubes_dataset_name
  cloudflare_logs_dataset        = module.iam.cloudflare_logs_dataset_name
  user_defined_functions_dataset = module.iam.user_defined_functions_dataset_name
}

module "sql" {
  source = "../../../terraform/modules/gcp/sql"

  project = local.project
  region  = local.region
  network = module.project.primary_network_self_link

  // TODO replace this hack with a depends_on-block once available in module level
  // see issue https://github.com/hashicorp/terraform/issues/10462
  enforce_dependency_to_project = module.project.export_for_dependency_workaround

  internal_application_metadata_instances_machine_type = local.internal_application_metadata_instances_machine_type
  internal_application_metadata_instances_master_name  = local.internal_application_metadata_instances_master_name
  analytics_machine_type                               = local.analytics_postgres_replica_machine_type
  analytics_master_name                                = local.analytics_postgres_replica_master_name
  analytics_database_version                           = local.analytics_postgres_replica_database_version
}

module "pubsub" {
  source = "../../../terraform/modules/gcp/pub_sub"

  project                              = local.project
  push_subscriptions                   = local.pub_sub_push_subscriptions
  ml_training_data_storage_bucket_name = module.gcs.ml_training_data_storage_bucket_name
  cloudflare_logs_storage_bucket_name  = module.gcs.cloudflare_logs_storage_bucket_name
}

module "cloud_tasks" {
  source = "../../../terraform/modules/gcp/cloud_tasks"

  project = local.project
  region  = local.region
}

module "network" {
  source = "../../../terraform/modules/gcp/network"

  project                                    = local.project
  region                                     = local.region
  network_name                               = module.project.primary_network_name
  serverless_subnetwork_ip_range             = local.serverless_egress_subnetwork_ip_range
  serverless_vpc_connector_machine_type      = "e2-micro"
  internal_load_balancer_subnetwork_ip_range = local.internal_load_balancer_subnetwork_ip_range
}

module "cloud_functions" {
  source = "../../../terraform/modules/gcp/cloud_functions"

  project                                                   = local.project
  region                                                    = local.region
  env                                                       = local.env
  function_source_bucket_name                               = module.gcs.cloud_functions_storage_bucket_name
  cloudflare_logs_dataset_name                              = module.iam.cloudflare_logs_dataset_name
  cloudflare_logs_storage_bucket_name                       = module.gcs.cloudflare_logs_storage_bucket_name
  application_storage_bucket_name                           = module.gcs.application_storage_bucket_name
  git_translations_repository                               = "sre-integrations-test"
  git_translations_branch                                   = "develop-sre"
  git_translations_function_service_account                 = module.iam.git_translations_service_account_email
  analytics_events_pubsub_dead_letter_queue_topic           = module.pubsub.analytics_ingest_dead_letter_queue_topic_pubsub_default
  analytics_events_pubsub_topic                             = module.pubsub.analytics_ingest_event_source_topic
  analytics_pubsub_republish_cloud_function_service_account = module.iam.analytics_pubsub_republish_service_account_email
  analytics_customer_reports_storage_bucket_name            = module.gcs.analytics_customer_reports_bucket_name
  analytics_customer_reports_cloud_function_service_account = module.iam.analytics_customer_report_export_service_account_email
  encrypted_secrets_storage_bucket_name                     = module.gcs.encrypted_secrets_bucket_name
  analytics_customer_reports_decrypt_key_id                 = module.kms.customer_secrets_key_id
  vpc_connector                                             = module.network.serverless_vpc_connector
}

module "dataflow" {
  source = "../../../terraform/modules/gcp/dataflow"

  project             = local.project
  region              = local.region
  network_name        = module.project.primary_network_name
  subnetwork_name     = "${module.project.primary_network_name}-dataflow-subnet"
  subnetwork_ip_range = local.dataflow_subnetwork_ip_range
  dataflow_bucket     = module.gcs.dataflow_storage_bucket_name

  analytics_ingest_max_workers                            = 2
  analytics_ingest_service_account_email                  = module.iam.analytics_ingest_service_account_email
  analytics_ingest_dead_letter_queue_pubsub_topic         = module.pubsub.analytics_ingest_dead_letter_queue_topic
  analytics_ingest_event_source_pubsub_subscription       = module.pubsub.analytics_ingest_event_source_subscription
  analytics_ingest_cubes_source_pubsub_subscription       = module.pubsub.analytics_ingest_cubes_source_subscription
  analytics_ingest_event_files_source_pubsub_subscription = module.pubsub.analytics_ingest_event_files_source_subscription
  analytics_ingest_event_files_bucket_name                = module.gcs.analytics_ingest_event_files_bucket_name
  analytics_ingest_bigquery_dataset                       = module.iam.analytics_dataset_name
  analytics_ingest_bigquery_batch_size                    = 50
  analytics_processing_max_workers                        = 2
  analytics_processing_service_account_email              = module.iam.analytics_processing_service_account_email
  analytics_processing_event_source_subscription          = module.pubsub.analytics_processing_event_source_subscription
  analytics_processing_dead_letter_queue_topic            = module.pubsub.analytics_processing_dead_letter_queue_topic
  analytics_cubes_ingest_pubsub_topic                     = module.pubsub.analytics_cubes_ingest_pubsub_topic
  threat_dump_parsing_max_workers                         = 2
  threat_dump_parsing_service_account_email               = module.iam.threat_dump_parsing_service_account_email
  threat_dump_parsing_file_event_subscription             = module.pubsub.threat_dump_parsing_file_event_subscription
  threat_dump_parsing_bucket_name                         = module.gcs.ml_training_data_storage_bucket_name
  cloudflare_logs_import_service_account_email            = module.iam.cloudflare_logs_import_service_account_email
  cloudflare_logs_import_file_event_subscription          = module.pubsub.cloudflare_logs_import_file_event_subscription
  cloudflare_logs_import_dataset_name                     = module.iam.cloudflare_logs_dataset_name

  analytics_ingest_clickhouse_service_account_email            = module.iam.analytics_ingest_clickhouse_service_account_email
  analytics_ingest_clickhouse_event_source_pubsub_subscription = module.pubsub.analytics_ingest_clickhouse_event_source_subscription
  analytics_ingest_clickhouse_cubes_source_pubsub_subscription = module.pubsub.analytics_ingest_clickhouse_cubes_source_subscription
  analytics_ingest_clickhouse_dead_letter_queue_pubsub_topic   = module.pubsub.analytics_ingest_clickhouse_event_dead_letter_queue_topic
  analytics_ingest_clickhouse_connection_url_secret_version    = "${module.secret_manager.analytics_ingest_clickhouse_connection_url_secret_id}/versions/2"
}

module "kms" {
  source = "../../../terraform/modules/gcp/kms"

  project = local.project
}
