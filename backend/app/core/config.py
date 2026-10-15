import os


class Settings:
    """Reads Lakebase Postgres connection parameters injected by Databricks Apps.

    Databricks injects PGHOST, PGPORT, PGDATABASE, PGUSER, PGSSLMODE,
    PGAPPNAME, and ENDPOINT_NAME when a Postgres resource is attached.
    """

    @property
    def pg_host(self) -> str:
        return os.environ.get("PGHOST", "")

    @property
    def pg_port(self) -> str:
        return os.environ.get("PGPORT", "5432")

    @property
    def pg_database(self) -> str:
        return os.environ.get("PGDATABASE", "")

    @property
    def pg_user(self) -> str:
        return os.environ.get("PGUSER", "")

    @property
    def pg_sslmode(self) -> str:
        return os.environ.get("PGSSLMODE", "require")

    @property
    def endpoint_name(self) -> str:
        return os.environ.get("ENDPOINT_NAME", "")


settings = Settings()
