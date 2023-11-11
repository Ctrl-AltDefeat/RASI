"""medical history requirement

Revision ID: 999b8c4be096
Revises: 890f70b064ad
Create Date: 2023-11-11 12:38:17.356078

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '999b8c4be096'
down_revision: Union[str, None] = '890f70b064ad'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "medical_history",
        sa.Column("medical_history", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("text", sa.Text(), nullable=True),
        sa.Column("hash", sa.CHAR(64), nullable=True),
    )


def downgrade() -> None:
    op.drop_table("medical_history")
