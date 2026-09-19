import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
} from "@angular/core";
import { VexConfigService } from "@vex/config/vex-config.service";
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from "@angular/material/slide-toggle";
import { MatRadioChange, MatRadioModule } from "@angular/material/radio";
import { UpperCasePipe } from "@angular/common";
import {
  VexColorScheme,
  VexConfig,
  VexConfigName,
  VexThemeProvider,
} from "@vex/config/vex-config.interface";
import { CSSValue } from "@vex/interfaces/css-value.type";
import { isNil } from "@vex/utils/is-nil";
import { defaultRoundedButtonBorderRadius } from "@vex/config/constants";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { VEX_THEMES } from "@vex/config/config.token";

@Component({
  selector: "vex-config-panel",
  templateUrl: "./config-panel.component.html",
  styleUrls: ["./config-panel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    UpperCasePipe,
  ],
})
export class ConfigPanelComponent {
  private readonly configService = inject(VexConfigService);
  readonly themes = inject(VEX_THEMES);

  configs: VexConfig[] = this.configService.configs;
  readonly config = this.configService.config;

  readonly isRTL = computed(() => this.config().direction === "rtl");
  readonly colorScheme = computed(() => this.config().style.colorScheme);
  readonly selectedTheme = computed(() => this.config().style.themeClassName);

  ConfigName = VexConfigName;
  ColorSchemeName = VexColorScheme;

  roundedCornerValues: CSSValue[] = [
    {
      value: 0,
      unit: "rem",
    },
    {
      value: 0.25,
      unit: "rem",
    },
    {
      value: 0.5,
      unit: "rem",
    },
    {
      value: 0.75,
      unit: "rem",
    },
    {
      value: 1,
      unit: "rem",
    },
    {
      value: 1.25,
      unit: "rem",
    },
    {
      value: 1.5,
      unit: "rem",
    },
    {
      value: 1.75,
      unit: "rem",
    },
  ];

  roundedButtonValue: CSSValue = defaultRoundedButtonBorderRadius;

  themeClass(theme: VexThemeProvider): string {
    const state =
      this.selectedTheme() === theme.className
        ? "bg-primary-600 text-on-primary-600"
        : "bg-primary-600/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-500";

    return `${theme.className} vex-color-picker rounded-full mt-2 flex items-center cursor-pointer relative hover:bg-primary-600 hover:text-on-primary-600 dark:hover:bg-primary-600 dark:hover:text-on-primary-600 ${state}`;
  }

  setConfig(layout: VexConfigName, colorScheme: VexColorScheme): void {
    this.configService.setConfig(layout);
    this.configService.updateConfig({
      style: {
        colorScheme,
      },
    });
  }

  selectTheme(theme: VexThemeProvider): void {
    this.configService.updateConfig({
      style: {
        themeClassName: theme.className,
      },
    });
  }

  enableDarkMode(): void {
    this.configService.updateConfig({
      style: {
        colorScheme: VexColorScheme.DARK,
      },
    });
  }

  disableDarkMode(): void {
    this.configService.updateConfig({
      style: {
        colorScheme: VexColorScheme.LIGHT,
      },
    });
  }

  layoutRTLChange(change: MatSlideToggleChange): void {
    this.configService.updateConfig({
      direction: change.checked ? "rtl" : "ltr",
    });
  }

  toolbarPositionChange(change: MatRadioChange): void {
    this.configService.updateConfig({
      toolbar: {
        fixed: change.value === "fixed",
      },
    });
  }

  footerVisibleChange(change: MatSlideToggleChange): void {
    this.configService.updateConfig({
      footer: {
        visible: change.checked,
      },
    });
  }

  footerPositionChange(change: MatRadioChange): void {
    this.configService.updateConfig({
      footer: {
        fixed: change.value === "fixed",
      },
    });
  }

  isSelectedBorderRadius(borderRadius: CSSValue, config: VexConfig): boolean {
    return (
      borderRadius.value === config.style.borderRadius.value &&
      borderRadius.unit === config.style.borderRadius.unit
    );
  }

  selectBorderRadius(borderRadius: CSSValue): void {
    this.configService.updateConfig({
      style: {
        borderRadius: borderRadius,
      },
    });
  }

  isSelectedButtonStyle(
    buttonStyle: CSSValue | undefined,
    config: VexConfig,
  ): boolean {
    if (isNil(config.style.button.borderRadius) && isNil(buttonStyle)) {
      return true;
    }

    return buttonStyle?.value === config.style.button.borderRadius?.value;
  }

  selectButtonStyle(borderRadius: CSSValue | undefined): void {
    this.configService.updateConfig({
      style: {
        button: {
          borderRadius: borderRadius,
        },
      },
    });
  }

  isDark(colorScheme: VexColorScheme): boolean {
    return colorScheme === VexColorScheme.DARK;
  }
}
