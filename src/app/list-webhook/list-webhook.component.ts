import {Component, Input, OnInit} from '@angular/core';
import {Webhook} from "../webhook";
import {Storage} from "../storage";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {MatDialog} from "@angular/material";
import {WebhookService} from "../webhook.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-list-webhook',
  templateUrl: './list-webhook.component.html',
  styleUrls: ['./list-webhook.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListWebhookComponent implements OnInit {

  displayedColumns: string[] = ['id', 'types', 'token', 'name', 'description', 'actions'];
  expandedElement: Webhook | null;

  @Input()
  webhooks: Webhook[];


  constructor(private webhookService: WebhookService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  async onDelete(id){
    const dialog = this.dialog.open(ConfirmationComponent, {});

    dialog.afterClosed().subscribe(async confirm => {
      if (confirm) {
        const deletedWebhook = await this.webhookService.deleteWebhook(id);
        await this.ngOnInit();
      }
    });
  }

  async onEdit(id){
    await this.router.navigate(['webhooks', 'edit', id]);
  }

}
