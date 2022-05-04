import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProfileCategory } from 'src/app/models/profile-category/profile-category';
import { ProfileCategoryService } from 'src/app/services/profile-category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  categories: ProfileCategory[] = [];

  constructor(private categoryService: ProfileCategoryService) {}

  ngOnInit(): void {
    this.categoryService.getProfileCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!value) return;

    this.categoryService
      .createProfileCategory({ category: value })
      .subscribe((c) => {
        this.categories.push(c);
      });

    event.chipInput!.clear();
  }

  deleteCategory(id: number) {
    this.categoryService.deleteProfileCategory(id).subscribe(() => {
      this.categories = this.categories.filter((c) => c.id != id);
    });
  }
}
