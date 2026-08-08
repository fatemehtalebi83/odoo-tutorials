# -*- coding: utf-8 -*-

import logging
import os

from lxml import etree

from odoo.exceptions import ValidationError
from odoo.loglevels import ustr
from odoo.tools import misc, view_validation

_logger = logging.getLogger(__name__)

_gallery_validator = None


@view_validation.validate("gallery")
def schema_gallery(arch, model=None, **kwargs):
    global _gallery_validator

    if _gallery_validator is None:
        with misc.file_open(
            os.path.join("awesome_gallery", "rng", "gallery.rng")
        ) as f:
            _gallery_validator = etree.RelaxNG(etree.parse(f))

    if not _gallery_validator.validate(arch):
        for error in _gallery_validator.error_log:
            _logger.error(ustr(error))
        return False

    # Validate that the referenced fields exist
    if model is not None:
	    image_field = arch.get("image_field")
	    tooltip_field = arch.get("tooltip_field")

	    model_obj = kwargs["env"][model]

	    if image_field and image_field not in model_obj._fields:
		    raise ValidationError(
			    f"Unknown image_field '{image_field}' on model '{model}'."
		    )

	    if tooltip_field and tooltip_field not in model_obj._fields:
		    raise ValidationError(
			    f"Unknown tooltip_field '{tooltip_field}' on model '{model}'."
		    )

    return True