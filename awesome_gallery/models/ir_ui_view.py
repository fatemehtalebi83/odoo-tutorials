# -*- coding: utf-8 -*-
from odoo import fields, models


class View(models.Model):
	_inherit = 'ir.ui.view'

	type = fields.Selection(selection_add=[('gallery', "Awesome Gallery")])

	def _get_view_info(self):
		return {'gallery': {'icon': 'fa fa-picture-o'}} | super()._get_view_info()

	def _is_qweb_based_view(self, view_type):
		return (view_type == 'gallery') | super()._is_qweb_based_view(view_type)
