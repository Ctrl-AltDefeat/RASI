"""Create ips, medicaments, medicament_availability tables

Revision ID: 890f70b064ad
Revises: 
Create Date: 2023-10-21 07:39:22.282652

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "890f70b064ad"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "ips",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("name", sa.String(32), nullable=False),
    )
    op.create_table(
        "medicament",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("name", sa.String(32), nullable=False),
        sa.Column("brand", sa.String(32), nullable=False),
    )
    op.create_table(
        "medicament_availability",
        sa.Column(
            "medicament_id",
            sa.Integer,
            sa.ForeignKey("medicament.id"),
            primary_key=True,
        ),
        sa.Column("ips_id", sa.Integer, sa.ForeignKey("ips.id"), primary_key=True),
        sa.Column("units_available", sa.Integer, nullable=False),
    )


def downgrade() -> None:
    op.drop_table("medicament_availability")
    op.drop_table("medicament")
    op.drop_table("ips")
