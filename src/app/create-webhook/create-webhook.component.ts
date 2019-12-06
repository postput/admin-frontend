import {Component, NgZone, OnInit} from '@angular/core';
import {WebhookType} from "../webhook-type";
import {Webhook} from "../webhook";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {WebhookService} from "../webhook.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../snackbar.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.less']
})
export class CreateWebhookComponent implements OnInit {

  webhookTypes: WebhookType[] = [];

  webhookForm = this.fb.group({
    name: ['', Validators.required],
    storageId: [''],
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

  initEmptyForm(form: AbstractControl, webhookTypes: WebhookType[]) {
    const wht = webhookTypes.find(webhookType => webhookType.id === 1);
    const defaultConfig = wht.config;
    delete defaultConfig.triggerMethods;
    form.get('config').setValue(JSON.stringify(defaultConfig,undefined, 4));
  }

  async ngOnInit() {

    this.activatedRoute.params
      .subscribe(params => {
        this.webhookForm.get('storageId').setValue(params.storageId);
      });

    this.webhookTypes = await this.webhookService.getAllWebhookTypes();
    this.initEmptyForm(this.webhookForm, this.webhookTypes);
  }

  async submit() {
    const rawWebhook = this.webhookForm.getRawValue();
    rawWebhook.config = JSON.parse(rawWebhook.config) || {};
    rawWebhook.data = JSON.parse(rawWebhook.data) || {};
    try {
      const createdWebhook = await this.webhookService.createWebhook(rawWebhook);

      this.zone.run(async () => {
        const snackbar = this.snackbarService.showSuccess('Your webhook has been well created.', 'See it!');
        this.location.back();
      } );
    } catch (e) {
      console.log('storage of that name already exists!');
    }

  }
}
