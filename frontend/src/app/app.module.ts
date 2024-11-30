import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MemberFormComponent } from './member-form/member-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TemplateComponent } from './template/template.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticleComponent } from './article/article.component';
import { EventComponent } from './event/event.component';
import { FirebaseModule } from './Firebase.module';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { ModalComponent } from './modal/modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { ToolModalComponent } from './tool-modal/tool-modal.component';
import { ToolsCreateComponent } from './tools-create/tools-create.component';
import { AffecterMemberComponent } from './affecter-member/affecter-member.component';
import { AffecterEnseignantComponent } from './affecter-enseignant/affecter-enseignant.component';
import { ConsulterMemberComponent } from './consulter-member/consulter-member.component';
import { ConsulterInvitesComponent } from './consulter-invites/consulter-invites.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFormComponent,
    ConfirmDialogComponent,
    TemplateComponent,
    DashboardComponent,
    ToolsComponent,
    ArticleComponent,
    EventComponent,
    LoginComponent,
    ModalComponent,
    ToolModalComponent,
    ToolsCreateComponent,
    AffecterMemberComponent,
    AffecterEnseignantComponent,
    ConsulterMemberComponent,
    ConsulterInvitesComponent,
    ArticleCreateComponent,
  ],
  imports: [
    FirebaseModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    FirebaseModule,
    MatCardModule,
    JsonPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    NgChartsModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
