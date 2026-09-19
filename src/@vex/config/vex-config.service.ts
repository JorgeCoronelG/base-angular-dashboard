import { DOCUMENT, effect, inject, Service, signal } from "@angular/core";

import { DeepPartial } from "../interfaces/deep-partial.type";
import { mergeDeep } from "../utils/merge-deep";
import { VexLayoutService } from "../services/vex-layout.service";
import { vexConfigs } from "./vex-configs";
import {
  VexColorScheme,
  VexConfig,
  VexConfigName,
  VexConfigs,
} from "./vex-config.interface";
import { CSSValue } from "../interfaces/css-value.type";
import { VEX_CONFIG, VEX_THEMES } from "@vex/config/config.token";

@Service()
export class VexConfigService {
  private readonly initialConfig = inject<VexConfig>(VEX_CONFIG);
  private readonly themes = inject(VEX_THEMES);
  private readonly document = inject<Document>(DOCUMENT);
  private readonly layoutService = inject(VexLayoutService);

  readonly configMap: VexConfigs = vexConfigs;
  readonly configs: VexConfig[] = Object.values(this.configMap);
  private readonly _config = signal<VexConfig>(this.initialConfig);
  readonly config = this._config.asReadonly();

  constructor() {
    effect(() => this._updateConfig(this._config()));
  }

  setConfig(configName: VexConfigName) {
    const settings = this.configMap[configName];

    if (!settings) {
      throw new Error(`Config with name '${configName}' does not exist!`);
    }

    this._config.set(settings);
  }

  updateConfig(config: DeepPartial<VexConfig>) {
    this._config.update((current) => mergeDeep({ ...current }, config));
  }

  private _updateConfig(config: VexConfig): void {
    this._setLayoutClass(config.bodyClass);
    this._setStyle(config.style);
    this._setDensity();
    this._setDirection(config.direction);
    this._setSidenavState(config.sidenav.state);
    this._emitResize();
  }

  private _setStyle(style: VexConfig["style"]): void {
    /**
     * Set light/dark mode
     */
    switch (style.colorScheme) {
      case VexColorScheme.LIGHT:
        this.document.body.classList.remove(VexColorScheme.DARK);
        this.document.body.classList.add(VexColorScheme.LIGHT);
        break;

      case VexColorScheme.DARK:
        this.document.body.classList.remove(VexColorScheme.LIGHT);
        this.document.body.classList.add(VexColorScheme.DARK);
        break;
    }

    /**
     * Set theme class
     */
    this.document.body.classList.remove(...this.themes.map((t) => t.className));
    this.document.body.classList.add(style.themeClassName);

    /**
     * Border Radius
     */
    this.document.body.style.setProperty(
      "--vex-border-radius",
      `${style.borderRadius.value}${style.borderRadius.unit}`,
    );

    const buttonBorderRadius: CSSValue =
      style.button.borderRadius ?? style.borderRadius;
    this.document.body.style.setProperty(
      "--vex-button-border-radius",
      `${buttonBorderRadius.value}${buttonBorderRadius.unit}`,
    );
  }

  private _setDensity(): void {
    if (!this.document.body.classList.contains("vex-mat-dense-default")) {
      this.document.body.classList.add("vex-mat-dense-default");
    }
  }

  /**
   * Emit event so charts and other external libraries know they have to resize on layout switch
   * @private
   */
  private _emitResize(): void {
    if (window) {
      window.dispatchEvent(new Event("resize"));
      setTimeout(() => window.dispatchEvent(new Event("resize")), 200);
    }
  }

  private _setDirection(direction: "ltr" | "rtl") {
    this.document.body.dir = direction;
  }

  private _setSidenavState(sidenavState: "expanded" | "collapsed"): void {
    if (sidenavState === "expanded") {
      this.layoutService.expandSidenav();
    } else {
      this.layoutService.collapseSidenav();
    }
  }

  private _setLayoutClass(bodyClass: string): void {
    this.configs.forEach((c) => {
      if (this.document.body.classList.contains(c.bodyClass)) {
        this.document.body.classList.remove(c.bodyClass);
      }
    });

    this.document.body.classList.add(bodyClass);
  }
}
