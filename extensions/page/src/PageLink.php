<?php

namespace Pagekit\Page;

use Pagekit\Framework\ApplicationAware;
use Pagekit\System\Link\LinkInterface;

class PageLink extends ApplicationAware implements LinkInterface
{
    /**
     * @{inheritdoc}
     */
    public function getRoute()
    {
        return '@page/id';
    }

    /**
     * @{inheritdoc}
     */
    public function getLabel()
    {
        return __('Page');
    }

    /**
     * @{inheritdoc}
     */
    public function renderForm()
    {
        $pages = $this('db.em')->getRepository('Pagekit\Page\Entity\Page')->findAll();

        return $this('view')->render('page/admin/link.razr.php', compact('item', 'pages'));
    }
}