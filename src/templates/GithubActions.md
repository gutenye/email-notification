# GitHub Actions

```yaml
- name: Notify on failure
  run: curl ${{ secrets.NOTIFICATION_URL }} -d "Build failed: ${{ github.workflow }}"
```