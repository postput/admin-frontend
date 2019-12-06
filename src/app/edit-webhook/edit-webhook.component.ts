import {Component, NgZone, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {WebhookService} from "../webhook.service";
import {SnackbarService} from "../snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageType} from "../storage-type";
import {Storage} from "../storage";
import {Webhook} from "../webhook";
import {WebhookType} from "../webhook-type";
import {v4} from 'uuid';

@Component({
  selector: 'app-edit-webhook',
  templateUrl: './edit-webhook.component.html',
  styleUrls: ['./edit-webhook.component.less']
})
export class EditWebhookComponent implements OnInit {

  uuid = v4;
  id: number;
  webhookTypes: WebhookType[] = [];
  webhook: Webhook;

  webhookForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    token: [''],
    webhookTypeIds: [[1], Validators.required],
    config: ['{}'],
    data: ['{}']
  });

  constructor(private fb: FormBuilder,
              public webhookService: WebhookService,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackbarService,
              private zone: NgZone,
              private router: Router,
              public location: Location) { }

  initEmptyForm(form: AbstractControl, webhook: Webhook) {
    form.get('name').setValue(webhook.name);
    form.get('description').setValue(webhook.description);
    form.get('token').setValue(webhook.token);
    form.get('webhookTypeIds').setValue(webhook.webhookTypes.map(wht => wht.id));
    form.get('config').setValue(JSON.stringify(webhook.config, undefined, 4));
    form.get('data').setValue(JSON.stringify(webhook.data, undefined, 4));
  }

  generateNewToken() {
    this.webhookForm.get('token').setValue(this.uuid());
  }

  async ngOnInit() {

    this.activatedRoute.params
      .subscribe(params => {
        this.id = params.id;
      });

    this.webhookTypes = await this.webhookService.getAllWebhookTypes();
    this.webhook = await  this.webhookService.getWebhook(this.id);

    this.initEmptyForm(this.webhookForm, this.webhook);
  }

  async submit() {
    const rawWebhook = this.webhookForm.getRawValue();
    rawWebhook.config = JSON.parse(rawWebhook.config) || {};
    rawWebhook.data = JSON.parse(rawWebhook.data) || {};
    try {
      const editedWebhook = await this.webhookService.editWebhook(this.id, rawWebhook);

      this.zone.run(async () => {
        const snackbar = this.snackbarService.showSuccess('Your webhook has been well updated.', 'See it!');
        this.location.back();
      } );
    } catch (e) {
      console.log('storage of that name already exists!');
    }

  }

}
