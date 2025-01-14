import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config';
import { Tool } from 'src/models/tool';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  constructor(private httpClient: HttpClient) {}

  getTools(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(`${API.url}/${API.tool}/tools`);
  }

  saveTool(tool: Tool): Observable<Tool> {
    return this.httpClient.post<Tool>(
      `${API.url}/${API.tool}/tools/create`,
      tool
    );
  }

  updateTool(tool: Tool): Observable<Tool> {
    return this.httpClient.put<Tool>(
      `${API.url}/${API.tool}/tools/${tool.id}/update`,
      tool
    );
  }

  deleteTool(id: number): Observable<void> {
    this.httpClient.delete<void>(
      `${API.url}/${API.member}/members-per-outil/${id}/delete`
    );
    return this.httpClient.delete<void>(
      `${API.url}/${API.tool}/tools/${id}/delete`
    );
  }

  getToolById(id: number): Observable<Tool> {
    return this.httpClient.get<Tool>(`${API.url}/${API.tool}/tools/${id}`);
  }
}
